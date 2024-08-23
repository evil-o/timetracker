export interface IColorSpec {
    r: number;
    g: number;
    b: number;
}

export interface IActivityTypeColor {
    id: string;

    styleClass: string;

    color?: IColorSpec;
}

export interface IUndefinedActivityTypeColor {
    id: undefined;
    styleClass: undefined;
}

export interface INamedColor {
    name: string;
    color: [number, number, number];
}
