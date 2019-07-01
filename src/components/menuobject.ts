
export default interface MenuObject{
    title: string;
    texture?: string;
    state: string;
    changeState(state: string): void;
}