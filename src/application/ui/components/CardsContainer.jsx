const headingTags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
}


export const CardsContainer = ({ children, title = '', headingTag = 'h6' }) => {
    const HeadingTag = headingTags[headingTag.toLowerCase()] ? headingTags[headingTag.toLowerCase()] : headingTags.h6;
    return (
        <div className="border rounded-lg shadow-lg p-3 space-y-3">
            {
                !!title &&
                <HeadingTag className="text-center font-bold">
                    {title}
                </HeadingTag>
            }
            <div className="flex justify-around flex-wrap">
                {children}
            </div>
        </div>
    )
}
