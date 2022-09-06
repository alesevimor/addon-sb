import { DecoratorFunction } from "@storybook/addons";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
	return StoryFn();
};