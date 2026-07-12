import { hasSupabaseConfig, supabase } from '@/lib/supabase';

const createDemoUser = (email, role = 'employee') => {
  const normalizedEmail = email?.toLowerCase() || 'demo@ecosphere.io';
  const inferredRole = role === 'employee' && normalizedEmail.includes('manager')
    ? 'manager'
    : role === 'employee' && normalizedEmail.includes('admin')
      ? 'admin'
      : role;

  return {
    id: `demo-${Date.now()}`,
    email: normalizedEmail,
    name: normalizedEmail.split('@')[0].replace(/[^a-z0-9]+/gi, ' ').trim() || 'EcoSphere User',
    role: inferredRole,
    avatar: null,
  };
};

const createDemoAuth = () => {
  const storage = typeof window !== 'undefined' ? window.localStorage : null;

  const readStoredUser = () => {
    try {
      const rawValue = storage?.getItem('ecosphere-demo-user');
      return rawValue ? JSON.parse(rawValue) : null;
    } catch {
      return null;
    }
  };

  const persistUser = (user) => {
    storage?.setItem('ecosphere-demo-user', JSON.stringify(user));
    storage?.setItem('ecosphere-demo-auth', 'true');
  };

  const clearSession = () => {
    storage?.removeItem('ecosphere-demo-user');
    storage?.removeItem('ecosphere-demo-auth');
  };

  return {
    isAuthenticated: async () => storage?.getItem('ecosphere-demo-auth') === 'true',
    me: async () => readStoredUser(),
    loginViaEmailPassword: async (email, password) => {
      if (!email || !password) {
        throw new Error('Please enter your email and password.');
      }

      const user = createDemoUser(email, email.includes('manager') ? 'manager' : email.includes('admin') ? 'admin' : 'employee');
      persistUser(user);
      return { user };
    },
    register: async ({ email, password }) => {
      if (!email || !password) {
        throw new Error('Please enter your email and password.');
      }

      const user = createDemoUser(email, 'employee');
      persistUser(user);
      return { user };
    },
    verifyOtp: async ({ email }) => {
      const user = createDemoUser(email, 'employee');
      persistUser(user);
      return { access_token: 'demo-token', user };
    },
    resendOtp: async () => true,
    resetPasswordRequest: async () => true,
    resetPassword: async () => true,
    loginWithProvider: async (provider) => {
      const user = createDemoUser(`${provider}@ecosphere.local`, 'employee');
      persistUser(user);
      return { user };
    },
    logout: async () => {
      clearSession();
      return true;
    },
    redirectToLogin: (returnTo = '/') => {
      if (typeof window !== 'undefined') {
        const next = returnTo && returnTo !== '/' ? `?next=${encodeURIComponent(returnTo)}` : '';
        window.location.assign(`/login${next}`);
      }
    },
  };
};

const createSupabaseAuth = () => ({
  isAuthenticated: async () => {
    if (!supabase) return false;
    const { data } = await supabase.auth.getSession();
    return Boolean(data.session);
  },
  me: async () => {
    if (!supabase) return null;
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Supabase User',
      role: user.user_metadata?.role || 'employee',
      avatar: user.user_metadata?.avatar_url || null,
    };
  },
  loginViaEmailPassword: async (email, password) => {
    if (!supabase) return createDemoAuth().loginViaEmailPassword(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { user: data.user };
  },
  register: async ({ email, password }) => {
    if (!supabase) return createDemoAuth().register({ email, password });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return { user: data.user };
  },
  verifyOtp: async ({ email, otpCode }) => {
    if (!supabase) return createDemoAuth().verifyOtp({ email, otpCode });
    const { data, error } = await supabase.auth.verifyOtp({ email, token: otpCode, type: 'signup' });
    if (error) throw error;
    return { access_token: data.session?.access_token, user: data.user };
  },
  resendOtp: async (email) => {
    if (!supabase) return createDemoAuth().resendOtp(email);
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    if (error) throw error;
    return true;
  },
  resetPasswordRequest: async (email) => {
    if (!supabase) return createDemoAuth().resetPasswordRequest(email);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    if (error) throw error;
    return true;
  },
  resetPassword: async ({ resetToken, newPassword }) => {
    if (!supabase) return createDemoAuth().resetPassword({ resetToken, newPassword });
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  },
  loginWithProvider: async (provider, redirectTo = '/') => {
    if (!supabase) return createDemoAuth().loginWithProvider(provider);
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}${redirectTo}` } });
    return true;
  },
  logout: async () => {
    if (!supabase) return createDemoAuth().logout();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },
  redirectToLogin: (returnTo = '/') => {
    if (typeof window !== 'undefined') {
      const next = returnTo && returnTo !== '/' ? `?next=${encodeURIComponent(returnTo)}` : '';
      window.location.assign(`/login${next}`);
    }
  },
});

const createEntityCollection = (name) => {
  const storageKey = `ecosphere:${String(name).toLowerCase()}`;

  const readItems = () => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const writeItems = (items) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // ignore storage failures in demo/local mode
    }
  };

  return {
    list: async () => readItems(),
    filter: async (predicate) => {
      const items = readItems();
      if (typeof predicate === 'function') return items.filter(predicate);
      return items;
    },
    get: async (id) => {
      const items = readItems();
      return items.find((item) => item.id === id) ?? null;
    },
    create: async (payload = {}) => {
      const items = readItems();
      const created = {
        id: `${String(name).toLowerCase()}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        ...payload,
      };
      writeItems([created, ...items]);
      return created;
    },
    update: async (id, payload = {}) => {
      const items = readItems();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) return null;
      const updated = { ...items[index], ...payload, id };
      items[index] = updated;
      writeItems(items);
      return updated;
    },
    delete: async (id) => {
      const items = readItems();
      const next = items.filter((item) => item.id !== id);
      writeItems(next);
      return { success: true, deletedId: id };
    },
  };
};

const fallbackDb = {
  auth: hasSupabaseConfig ? createSupabaseAuth() : createDemoAuth(),
  entities: new Proxy({}, {
    get: (_, prop) => createEntityCollection(prop?.toString?.() || 'entity'),
  }),
  integrations: { Core: { UploadFile: async () => ({ file_url: '' }) } },
};

export const db = fallbackDb;
export default db;