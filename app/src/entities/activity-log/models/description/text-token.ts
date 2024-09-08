import { Token } from "./token";
import { TokenType } from "./token-type";

export class TextToken extends Token {
    public constructor(public readonly text: string) {
        super(TokenType.Text);
    }

    public override toString(): string {
        return this.text;
    }
}
