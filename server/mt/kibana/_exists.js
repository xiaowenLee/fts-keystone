/*
 * Copyright 2016 FUJITSU LIMITED
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

import kibanaIndex from './kibanaIndex';

export default (server, userObj) => {
  const indexName = kibanaIndex(server, userObj);
  return exists(server, indexName)
    .then((resp) => {
      return {indexName, resp};
    });
};

export function exists(server, indexName, status) {
  const es = server.plugins.elasticsearch.client;
  const opts = {
    timeout            : '5s',
    index              : indexName,
    ignore             : [408],
    waitForActiveShards: 1
  };
  if (status) {
    opts.status = status;
  }
  return es.cluster.health(opts);
}

