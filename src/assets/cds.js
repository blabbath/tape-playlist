import 'normalize.css/normalize.css'
import '@cds/core/styles/module.reset.min.css'
import '@cds/core/styles/module.tokens.min.css'
import '@cds/core/styles/module.layout.min.css'
import '@cds/core/styles/module.typography.min.css'
import '@cds/core/styles/module.shims.min.css'
import '@cds/city/css/bundles/default.min.css'

import '@cds/core/icon/register.js'
import '@cds/core/divider/register.js'
import '@cds/core/alert/register.js'
import '@cds/core/button/register.js'
import '@cds/core/input/register.js'
import '@cds/core/forms/register.js'

import {
    ClarityIcons,
    headphonesIcon,
    plusCircleIcon,
    minusCircleIcon,
    angleIcon,
    timesIcon,
} from '@cds/core/icon'
ClarityIcons.addIcons(headphonesIcon)
ClarityIcons.addIcons(plusCircleIcon)
ClarityIcons.addIcons(minusCircleIcon)
ClarityIcons.addIcons(angleIcon)
ClarityIcons.addIcons(timesIcon)
