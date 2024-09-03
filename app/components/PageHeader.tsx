interface PageHeaderProps {
    page_name: string;
}

const PageHeader = ({ page_name }: PageHeaderProps) => {
    return (
        <div>
            <h1 className="scroll-m-20  font-sans font-thin tracking-wide text-7xl text-white  tracking-tight lg:text-3xl">
                    {page_name}
            </h1>
            <div className="text-white text-4xl">
                    ---
            </div>
        </div>
    );
};

export default PageHeader