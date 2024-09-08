import { Token } from "./token";
import { TokenType } from "./token-type";

export class TagToken extends Token {
    public constructor(public readonly tag: string) {
        super(TokenType.Tag);
    }

    public override toString(): string {
        return this.tag;
    }
}
