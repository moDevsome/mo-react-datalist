import { MoReactDatalistOption, MoReactDatalistProp } from './MoReactDatalist.model';
import { useState } from 'react';

function MoReactDatalist({
  options,
  selectedValue,
  onSelectData,
  dataFilter,
  params
}: MoReactDatalistProp) {

  const _dataFilter = dataFilter === undefined
    ? (queryString: string, options: MoReactDatalistOption[]) => options.filter(option => {
      if(queryString.length > 0) {
        if(params !== undefined && params.search !== undefined && (params.search.caseSensitive ?? false) === true) {
          return option.text.includes(queryString);
        }
        else {
          return option.text.toLocaleLowerCase().includes(queryString.toLocaleLowerCase());
        }
      }
      else {
        return option.value !== selectedOption?.value;
      }
    })
    : dataFilter;

  const onInputChange = (queryString: string): void => {
    const newMoReactDatalist = _dataFilter(queryString, options);

    setCurrentQueryString(queryString);
    setCurrentMoReactDatalist(newMoReactDatalist);
    setDisplay(newMoReactDatalist.length > 0);
  }

  const onInputBlur = (event: React.FocusEvent): void => {
    let isOptionButtonClick = false; // Do not hide the list if the blur is triggered by a click on an option button
    if(event.relatedTarget !== null) {
      const target = event.relatedTarget as HTMLElement;
      isOptionButtonClick = target.dataset['ismodatalistbutton'] === 'true';
    }

    if(isOptionButtonClick === false) {
      setDisplay(false);
    }
  }

  const _onSelectData = (option: MoReactDatalistOption) => {
    setDisplay(false);
    setCurrentQueryString(option.text);
    onSelectData(option.value);
  }

  const selectedOption = options.find(option => option.value === selectedValue) ?? undefined;

  const [currentQueryString, setCurrentQueryString] = useState<string>(selectedOption === undefined ? '' : selectedOption.text);
  const [currentMoReactDatalist, setCurrentMoReactDatalist] = useState<MoReactDatalistOption[]>(_dataFilter(currentQueryString, options));
  const [display, setDisplay] = useState<boolean>(false);

  // Use params
  let datalistOptionsWrapperAttributes = {};
  let datalistOptionButtonAttributes = {};
  if(params !== undefined) {
    datalistOptionsWrapperAttributes = params.datalistOptionsWrapper ?? {}
    datalistOptionButtonAttributes = params.datalistOptionButton ?? {}
  }

  const datalistContainerStyle = {
    position: 'relative'
  } as React.CSSProperties;

  const datalistOptionsWrapperDisplayStyle = {
    position: 'absolute',
    top: 'auto',
    left: 0,
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap'
  } as React.CSSProperties;

  if(options !== undefined && options !== null) {
    return(
      <div className="modatalist-container" style={ datalistContainerStyle }>
        <input
          value={ currentQueryString }
          onChange={ event => onInputChange(event.currentTarget.value) }
          onFocus={ event => onInputChange(event.currentTarget.value) }
          onBlur={ event => onInputBlur(event) }
          className={ params?.input?.className }
          placeholder={ params?.input?.placeHolder }
          style={{ width: '100%' }}
        />
        <div style={
            display === false ? { display: 'none' } : datalistOptionsWrapperDisplayStyle
          } {...datalistOptionsWrapperAttributes}>
          {
            currentMoReactDatalist.map((option, index) =>
              <button
                data-ismodatalistbutton="true"
                key={ index }
                onClick={ () => _onSelectData(option) }
                {...datalistOptionButtonAttributes}
              >{ option.text }</button>
            )
          }
        </div>
      </div>
    )
  }
}

export { MoReactDatalist };