[![Build Status](https://app.travis-ci.com/ebsaral/netlify-plugin-redirect-env-placeholders.svg?branch=main)](https://app.travis-ci.com/ebsaral/netlify-plugin-redirect-env-placeholders)

# netlify-plugin-redirect-env-placeholders

This plugin replaces the placeholders defined in `_redirects` file dynamically on preBuild stage.

# What it does

Imagine you have a file for your redirects defined in `_redirects` file:

```
/api/checkout/* {{env:TEST_API_URL}}/:splat 200

/api/auth/* {{env:ENV_NON_EXISTENT|http://default-domain.com}}/api/auth/:splat 200

```

And you defined `TEST_API_URL` environment variable to be `https://this.is.test/hey`

With this plugin, your published `_redirects` will be transformed to:

```
/api/checkout/* https://this.is.test/hey/:splat 200

/api/auth/* http://default-domain.com/api/auth/:splat 200
```

# How to use

## Syntax

`{{env:ENV_VAR_NAME}}` or `{{env:ENV_VAR_NAME|default_value}}` (if the variable does not exist, default_value will be written)

## netlify.toml

```toml
[[plugins]]
package = "netlify-plugin-redirect-env-placeholders"
  [plugins.inputs]
  source = '_redirects'
  base = '/opt/build/repo/'

```

Both inputs are optional:

| name     | description                                                     | default      |
| -------- | --------------------------------------------------------------- | ------------ |
| `source` | Source filename (It should be on the root path of your project) | `_redirects` |
| `base`   | Base path of the build during preBuild step where files exist   | `.`          |

### Note

If you would like to use this plugin with [netlify-plugin-contextual-env](https://github.com/cball/netlify-plugin-contextual-env), please make sure that this plugin is added afterwards.
