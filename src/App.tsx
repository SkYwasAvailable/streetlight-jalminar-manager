import React from 'react';
import { AppNavigator } from './navigation/AppNavigator';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './integrations/supabase/client';

const App = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AppNavigator />
    </SessionContextProvider>
  );
};

export default App;