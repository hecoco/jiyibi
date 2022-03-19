import clone from "@/lib/clone";


const localStorageKeyName = 'recodList';

const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords(){
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList;
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const record2: RecordItem = clone(record);
        // record2.createdAt = new Date(+new Date() + 8 * 3600 * 1000)
        //     .toJSON()
        //     .substr(0, 19)
        //     .replace("T", " ");
        record2.createdAt = new Date().toISOString();
        this.recordList && this.recordList.push(record2);
        recordStore.saveRecords();
    },
};
recordStore.fetchRecords();

export default recordStore;