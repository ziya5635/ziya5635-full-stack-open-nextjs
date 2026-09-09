let nextId = 8;

const blogs = [
    {
        id: 1,
        title: "How to Build Healthy Habits That Last",
        author: "Dr. Sarah Johnson",
        url: "/blogs/how-to-build-healthy-habits",
        likes: 124,
    },
    {
        id: 2,
        title: "Understanding Vitamins and Minerals",
        author: "Dr. Michael Brown",
        url: "/blogs/understanding-vitamins-and-minerals",
        likes: 89,
    },
    {
        id: 3,
        title: "The Importance of Staying Hydrated",
        author: "Emily Wilson",
        url: "/blogs/importance-of-staying-hydrated",
        likes: 156,
    },
    {
        id: 4,
        title: "A Beginner's Guide to Better Sleep",
        author: "Dr. James Anderson",
        url: "/blogs/beginners-guide-to-better-sleep",
        likes: 203,
    },
    {
        id: 5,
        title: "Healthy Eating on a Busy Schedule",
        author: "Lisa Martinez",
        url: "/blogs/healthy-eating-busy-schedule",
        likes: 117,
    },
    {
        id: 6,
        title: "How Exercise Supports Your Overall Health",
        author: "Dr. David Wilson",
        url: "/blogs/exercise-and-overall-health",
        likes: 178,
    },
    {
        id: 7,
        title: "Managing Stress in Everyday Life",
        author: "Dr. Emma Taylor",
        url: "/blogs/managing-everyday-stress",
        likes: 142,
    },
    {
        id: 8,
        title: "Reading Medicine Labels Correctly",
        author: "Dr. Robert Davis",
        url: "/blogs/reading-medicine-labels",
        likes: 96,
    },
];

export function getBlogs() {
    return blogs;
}

export function addBlog(title: string, author: string, url: string) {
    blogs.push({ id: ++nextId, title, author, url, likes: 0 })
}

export function findBlog(id: number) {
    return blogs.find(item => item.id === id)
}

export function likeBlog(id: number) {
    const blog = findBlog(id)
    if (blog) {
        blog.likes += 1
    }
    return blog
}