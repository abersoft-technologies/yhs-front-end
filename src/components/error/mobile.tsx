import { Flex } from "../ui/Flex"
import { Text } from "../ui/text/Text"

import styles from "./mobile.module.scss"

export const Mobile = () => {
    return (
        <Flex direction="column" class={styles.container} align="center" justify="center" width="full">
            <div>
                <Text text="Just nu är inte systemet tillgängligt i mobilen ¯\_(ツ)_/¯" textSize="xx-large" pX="large" pY="large" />
            </div>
        </Flex>
    )
}