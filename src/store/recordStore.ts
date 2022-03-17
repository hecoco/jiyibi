import clone from "@/lib/clone";
import tagStore from "@/store/tagStore";


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
        record2.createdAt = new Date(+new Date() + 8 * 3600 * 1000)
            .toJSON()
            .substr(0, 19)
            .replace("T", " ");
        this.recordList && this.recordList.push(record2);
        recordStore.saveRecords();
    },
    inquireRecord(tag:String[]){
        const record = this.recordList.map(item => item.tags);


        const b: RecordItem[] =[]
        return b;
    }
};
recordStore.fetchRecords();

export default recordStore;