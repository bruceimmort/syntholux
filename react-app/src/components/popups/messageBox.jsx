export default function MessageBox( props ) {
    return(
        <>
        <div class=" fixed bg-white shadow-md py-3 px-3 flex flex-row rounded-lg font-mono w-50 ml-[42%] mt-[.5%]">
            <div class="bg-teal-400 inline-block rounded-lg p-1 mr-3"></div>
            <p class="p-1">{props.message}</p>
        </div>
        </> 
    )
}