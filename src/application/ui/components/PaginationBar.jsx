export const PaginationBar = ({ pagesCanBeGenerated = null, currentPage = null, nextPage = null, previousPage = null }) => {
    if (!pagesCanBeGenerated || !currentPage || !nextPage || !previousPage) return (<div>All parameters are required</div>)
    return (
        <div className="space-y-3 mt-5">
            <div className="text-center">
                {`Página ${currentPage} de ${pagesCanBeGenerated}`}
            </div>
            <div className="flex justify-center space-x-7">
                <button className={`font-bold w-12 rounded-md text-white bg-gradient-to-br from-blue-500 to-purple-300 ${currentPage === 1 ? "from-gray-300 to-gray-100 text-gray-300" : ""}`} onClick={previousPage} disabled={currentPage === 1}>
                    &lt;
                </button>

                <button className={`font-bold w-12 rounded-md text-white bg-gradient-to-br from-blue-500 to-purple-300 ${currentPage === pagesCanBeGenerated ? "from-gray-300 to-gray-100 text-gray-300" : ""}`} onClick={nextPage} disabled={currentPage === pagesCanBeGenerated}>
                    &gt;
                </button>
            </div>
        </div>
    )
}