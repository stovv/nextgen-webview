import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  close(): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NavigationModule');