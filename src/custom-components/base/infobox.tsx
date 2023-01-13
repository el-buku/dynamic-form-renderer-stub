import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { InterpolatedLabel } from "../schemas";
import { ReactComponent as LightbulbIcon } from "~/assets/icons/lightbulb-icon.svg";
// Placeholder
import { ReactComponent as WarningIcon } from "~/assets/icons/notes-button.svg";

import { useAuthContext } from "~/mocked-auth-context";
import { TCustomComponentProps } from "../types";
import { parseInterpolatedLabel } from "../../form-components/interpolated-label";

function Infobox({
  infoboxText,
  infoboxTitle,
  infoboxType,
}: TCustomComponentProps & {
  infoboxText?: InterpolatedLabel;
  infoboxTitle: InterpolatedLabel;
  infoboxType: "info" | "warning";
}) {
  //   const { error, label, register } = props;
  const { t } = useTranslation();
  const { userType } = useAuthContext();
  return (
    userType === "client" &&
    infoboxText !== undefined && (
      <Flex direction="column">
        <Flex alignItems="center">
          {infoboxType === "info" ? <LightbulbIcon /> : <WarningIcon />}
          <Text
            maxHeight="160px"
            fontWeight="semibold"
            lineHeight={1.2}
            ml={2}
            color={infoboxType === "info" ? "secondary.500" : "#F6A200"}
          >
            {parseInterpolatedLabel(infoboxTitle, t)}
          </Text>
        </Flex>
        <Text overflow="auto">{parseInterpolatedLabel(infoboxText, t)}</Text>
      </Flex>
    )
  );
}
export default Infobox;
