import { Text } from "@/components";
import { useTranslation } from "react-i18next";

export const Transfers = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Text as="h2" variant="textLarge">
        {t("transfers")}
      </Text>
    </div>
  );
};
