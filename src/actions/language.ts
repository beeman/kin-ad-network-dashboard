import { FSA } from 'flux-standard-action';

export const LOAD = 'LANG_LOAD';
export interface Load extends Omit<FSA, 'payload'> {
    payload: { lang: string; messages: Record<string, string> }
}
export const load = (lang: string, messages: Record<string, string>) => ({
    payload: { lang, messages },
    type: LOAD,
}) as Load;
export type LoadAction = typeof load;

export const SET = 'LANG_SET';
export interface Set extends Omit<FSA, 'payload'> {
    payload: { lang: string }
}
export const set = (lang: string) => ({
    payload: { lang },
    type: SET,
}) as Set;
export type SetAction = typeof set;
