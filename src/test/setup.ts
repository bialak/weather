import { render as nativeRender } from "@testing-library/react";
import { ReactElement } from "react";
import Wrapper from "./Wrapper";

export * from "@testing-library/react";

const render = (component: ReactElement) => {
	return nativeRender(component, { wrapper: Wrapper });
};

export { render };
