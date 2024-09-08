import { TagToken } from "../models/description/tag-token";
import { TextToken } from "../models/description/text-token";
import { Token } from "../models/description/token";

export const TAG_CHARACTER = "#";
const TAG_END_CHARACTERS = " .,";

enum ParserState {
    Start,
    InText,
    InTag,
}

interface IParserState {
    /** Current state of the parser */
    state: ParserState;

    /** Current position of the parser */
    index: number;

    /** Full string being parsed */
    input: string;

    /** List of output tokens */
    tokens: Token[];
}

function stateInTag(state: IParserState): void {
    state.state = ParserState.InTag;
    if (state.index >= state.input.length) {
        return;
    }

    // skip tag character
    state.index += 1;

    let tag = "";
    while (state.index < state.input.length) {
        const character = state.input.charAt(state.index);
        if (TAG_END_CHARACTERS.includes(character)) {
            break;
        } else {
            state.index += 1;
            tag += character;
        }
    }
    if (tag !== "") {
        state.tokens.push(new TagToken(tag));
    } else {
        state.tokens.push(new TextToken(TAG_CHARACTER));
    }
    stateInText(state);
}

function stateInText(state: IParserState): void {
    state.state = ParserState.InText;
    if (state.index >= state.input.length) {
        return;
    }

    const nextTag = state.input.indexOf(TAG_CHARACTER, state.index);
    if (nextTag < 0) {
        state.tokens.push(new TextToken(state.input.slice(state.index)));
        state.index = state.input.length;
    } else {
        state.tokens.push(
            new TextToken(state.input.slice(state.index, nextTag))
        );
        state.index = nextTag;
        stateInTag(state);
    }
}

function stateStart(state: IParserState): void {
    const character = state.input[state.index];

    switch (character) {
        case TAG_CHARACTER:
            stateInTag(state);
            break;

        default:
            stateInText(state);
    }
}

export function parseDescription(description: string): Token[] {
    const state: IParserState = {
        index: 0,
        state: ParserState.Start,
        input: description,
        tokens: [],
    };

    stateStart(state);

    return state.tokens;
}
