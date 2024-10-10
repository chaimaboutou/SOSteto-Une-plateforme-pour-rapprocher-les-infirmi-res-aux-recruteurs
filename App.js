import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as React from 'react';

import { useQuery, QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient();


import { View , ScrollView} from 'react-native';

import Footer from './src/components/Footer';
import Navigation from './src/navigation/MainPageNavigation';
import MainPageNavigation from './src/navigation/MainPageNavigation';
import MainPageScreen from './src/screens/MainPageScreen';




function App(){
  return(
    
    
    <QueryClientProvider client={queryClient}>
      <Navigation/>
    </QueryClientProvider>
    
  )
}

export default App;