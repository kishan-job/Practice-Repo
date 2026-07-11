export  const Input = ({lable="input",handelInput})=>{

    render(
        <><label hmtlfor ="label">{label}</label>
        <input id="label" type="text" onChange={handelInput}></input></>
    )
}
