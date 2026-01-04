import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/lib/projectsData'
import ProjectDetail from '@/components/project-detail'
import { Metadata } from 'next'

interface ProjectPageProps {
    params: {
        name: string
    }
}

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        name: project.slug,
    }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = getProjectBySlug(params.name)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} - Montassar Souli`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'website',
        },
    }
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = getProjectBySlug(params.name)

    if (!project) {
        notFound()
    }

    return <ProjectDetail project={project} />
}
