import Reactotron, {
    trackGlobalErrors,
} from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure()
    .use(reactotronRedux())
    .use(trackGlobalErrors());

if (ENV) {
    Reactotron.connect();
}

