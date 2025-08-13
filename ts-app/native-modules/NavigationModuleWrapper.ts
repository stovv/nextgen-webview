import NavigationModule from './NavigationModule';

export class NavigationService {
  /**
   * Закрывает текущий экран, вызывая goBack в навигации
   * @returns Promise<boolean> - true если успешно закрыто
   */
  static async close(): Promise<boolean> {
    try {
      return await NavigationModule.close();
    } catch (error) {
      console.error('Ошибка при закрытии экрана:', error);
      throw error;
    }
  }
}

export default NavigationService; 