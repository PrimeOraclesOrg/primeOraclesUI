import { MainLayout, SettingsBalanceTemplate } from "@/components/templates";
import { useSettings } from "../useSettings";
import { mockTransactions } from "@/data";
import { useGetMyBalanceQuery } from "@/store/usersApi";
import { ErrorState, LoadingScreen } from "@/components/atoms";

export const BalanceSettings = () => {
  const { onLogout, profile } = useSettings();
  const { data: balance, isLoading, isError, refetch } = useGetMyBalanceQuery();

  if (isLoading) return <LoadingScreen />;

  if (isError || balance === undefined) {
    return (
      <MainLayout>
        <ErrorState
          title="Не удалось загрузить баланс"
          message="Произошла ошибка при загрузке данных. Попробуйте ещё раз."
          onRetry={refetch}
        />
      </MainLayout>
    );
  }

  return (
    <SettingsBalanceTemplate
      balance={balance}
      name={profile?.name}
      username={profile?.username}
      transactions={mockTransactions}
      onLogout={onLogout}
    />
  );
};
