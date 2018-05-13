import Reactotron, {
    trackGlobalErrors,
} from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure()
    .use(reactotronRedux())
    .use(trackGlobalErrors());

Reactotron.connect();

