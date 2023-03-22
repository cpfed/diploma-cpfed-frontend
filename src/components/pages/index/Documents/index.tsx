interface DocumentLink {
    title: string
    link: string
}

// TODO: redirect to usefull links
export const elements: DocumentLink[] = [
    {
        title: "documents:document-title-1",
        link: "localhost:3000/fake",
    },
    {
        title: "documents:document-title-2",
        link: "localhost:3000/fake",
    },
]
export { default } from './Documents'