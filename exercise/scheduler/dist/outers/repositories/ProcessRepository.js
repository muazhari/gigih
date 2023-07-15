"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessRepository {
    constructor() {
        this.data = [
        // new Process(
        //   '0',
        //   'GET',
        //   'url1',
        //   undefined,
        //   undefined,
        //   new Date(),
        //   true,
        //   1000,
        //   10
        // ),
        // new Process(
        //   '1',
        //   'GET',
        //   'url2',
        //   undefined,
        //   undefined,
        //   new Date(),
        //   true,
        //   1000,
        //   10
        // )
        ];
        this.readAll = () => {
            return this.data;
        };
        this.readOneById = (id) => {
            const foundItem = this.data.find((item) => item.id === id);
            if (foundItem === undefined) {
                throw new Error('Process id not found.');
            }
            return foundItem;
        };
        this.createOne = (item) => {
            this.data.push(item);
            return item;
        };
        this.patchOneById = (id, item) => {
            const foundItem = this.readOneById(id);
            foundItem.patchFrom(item);
            return foundItem;
        };
        this.deleteOneById = (id) => {
            const foundItem = this.readOneById(id);
            this.data = this.data.filter((item) => item.id !== id);
            return foundItem;
        };
    }
}
exports.default = ProcessRepository;
//# sourceMappingURL=ProcessRepository.js.map