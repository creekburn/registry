# Contributing to @creekburn/registry

If you are not me and want to contribute, thanks!

Submit an issue if you don't know how to code.

Use the Development guide below if you want to submit a PR.

## Develpoment Tools

Here are the [npm run](https://docs.npmjs.com/cli/v8/commands/npm-run-script) commands.

| Script         | Description                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs`         | Produce markdown formated API documentation from the [JSDoc](https://jsdoc.app/) comments.                                                 |
| `eslint`       | Runs [ESLint](https://eslint.org/) to check for style errors.                                                                              |
| `eslint:fix`   | Attempts to correct [ESLint](https://eslint.org/) style errors.                                                                            |
| `postinstall`  | Copies git hooks from `./hooks` into `./.git/hooks`.                                                                                       |
| `prettier`     | Runs [Prettier](https://prettier.io/) to check for format errors.                                                                          |
| `prettier:fix` | Attempts to correct [Prettier](https://prettier.io/) format errors.                                                                        |
| `test`         | Runs all tests using [c8](https://github.com/bcoe/c8#readme) for coverage, and [ava](https://github.com/avajs/ava) as a testing framework. |
| `tsc`          | As much as TS sucks, we can still output type definitions from [JSDoc](https://jsdoc.app/).                                                |
