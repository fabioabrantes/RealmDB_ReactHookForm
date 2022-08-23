import Realm from "realm";
import { OrderSchema } from './Schemas/OrderSchema';

// o realm usa recurso nativos. não consegue pelo expogo. pois vai precisar ler a pasta android ou ios
// yarn react-native start - inicia o bundle
//yarn react-native run-android
export const getRealm = async () => await Realm.open({
  path: "decode-app", // nome do banco de dados
  schema: [OrderSchema],
  schemaVersion: 3
});
