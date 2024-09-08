import { TokenType } from "./token-type";

export abstract class Token {
    public constructor(public readonly type: TokenType) {}
}
