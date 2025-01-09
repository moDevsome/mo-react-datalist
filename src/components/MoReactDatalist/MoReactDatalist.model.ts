/**
 * Options to render into the datalist
 * @param {string} text - The option text
 * @param {unknown} value - The value associated with the option
 */
type MoReactDatalistOption = {
  text: string;
  value: unknown;
}

/**
 * Params for the text lookup
 * @param {boolean} caseSensitive - Set to true if the search must be case sensitive, false by default.
 */
type MoReactDatalistSearchParams = {
  caseSensitive?: boolean;
}

/**
 * Params for the datalist input
 * @param {string} className - CSS class of the input
 * @param {string} placeHolder - Placeholder of the input
 */
type MoReactDatalistInputParams = {
  className?: string;
  placeHolder?: string;
}

/**
 * Params for the datalist options wrapper
 * @param {string} className - CSS class of the input
 */
type MoReactDatalistOptionsWrapperParams = {
  className?: string;
}

/**
 * Params for the datalist options
 * @param {string} className - CSS class of the input
 */
type MoReactDatalistOptionButtonParams = {
  className?: string;
}

/**
 * Params for the MoReactDatalist component
 * @param {MoReactDatalistSearchParams} search - Params for the text lookup
 * @param {MoReactDatalistInputParams} input - Params for the datalist input
 * @param {MoReactDatalistOptionsWrapperParams} dataFilter - Params for the datalist options wrapper
 * @param {MoReactDatalistOptionButtonParams} datalistOptionButton - Params for the datalist options
 */
type MoReactDatalistParams = {
  search?: MoReactDatalistSearchParams,
  input?: MoReactDatalistInputParams,
  datalistOptionsWrapper?: MoReactDatalistOptionsWrapperParams;
  datalistOptionButton?: MoReactDatalistOptionButtonParams;
}

/**
 * Input params for the MoReactDatalist component
 * @param {unknown} selectedValue - The pre-selected value
 * @param {MoReactDatalistOption[]} options - Required. The options to render
 * @param {CallableFunction} onSelectData - Required. The function called on option select
 * @param {CallableFunction} dataFilter - A function called to filter the data on input change
 * @param {MoReactDatalistParams} params - Component params
 */
type MoReactDatalistProp = {
  selectedValue?: unknown;
  options: MoReactDatalistOption[];
  onSelectData: (selectedValue: unknown) => unknown;
  dataFilter?: (queryString: string, MoReactDatalistOptions: MoReactDatalistOption[]) => MoReactDatalistOption[];
  params?: MoReactDatalistParams;
}

export type { MoReactDatalistOption, MoReactDatalistProp, MoReactDatalistParams };