// function to remove html tags
// return contents inside html tags

export function StripHTML(html: string): string{
    return html.replace(/<[^>]+>/g, "").trim();
}