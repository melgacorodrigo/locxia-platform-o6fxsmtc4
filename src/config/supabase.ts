/**
 * Mock Supabase Configuration
 * This acts as a placeholder for the actual @supabase/supabase-js client
 * handling Auth, Postgres DB, and Storage.
 */

export const supabaseClient = {
  from: (tableName: string) => ({
    select: (columns = '*') => ({
      eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
      then: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: (data: any) => Promise.resolve({ data, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data, error: null }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
    }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: any) => Promise.resolve({ data: { path }, error: null }),
      download: (path: string) => Promise.resolve({ data: new Blob(), error: null }),
    }),
  },
}
