export interface IActivityType {
    name: string;

    id: string;

    isNonWorking: boolean;

    isArchived: boolean;

    colorId?: string;
}

export interface IActivityTypes {
    activities: IActivityType[];
}
