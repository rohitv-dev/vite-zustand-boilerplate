import { Container, Flex } from "@chakra-ui/react";

function PageContainer({ textAlign, children }: any) {
	return (
		<Flex
			height="100%"
			justifyContent="center"
			alignItems="center"
			animate="in"
			exit="out"
			initial="out"
      textAlign={textAlign}
		>
			<Container>{children}</Container>
		</Flex>
	);
}

export default PageContainer;
