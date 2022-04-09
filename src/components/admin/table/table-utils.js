
export const getLink = (selectedCategory, id) => {
    if (selectedCategory === 'SoftwareApplication') {
        if (id) {
            return `/add-update-software-application/${id}`
        } else {
            return `/add-update-software-application`
        }
    } else if (selectedCategory === 'Category') {
        if (id) {
            return `/add-update-category/${id}`
        } else {
            return `/add-update-category`
        }
    } else if (selectedCategory === 'Priority') {
        if (id) {
            return `/add-update-priority/${id}`
        } else {
            return `/add-update-priority`
        }
    } else if (selectedCategory === 'Story') {
        if (id) {
            return `/add-update-story/${id}`
        } else {
            return `/add-update-story`
        }
    } else if (selectedCategory === 'StoryTask') {
        if (id) {
            return `/add-update-story-task/${id}`
        } else {
            return `/add-update-story-task`
        }
    } else if (selectedCategory === 'Employee') {
        if (id) {
            return `/add-update-employee/${id}`
        } else {
            return `/add-update-employee`
        }
    } else if (selectedCategory === 'Person') {
        if (id) {
            return `/add-update-person/${id}`
        } else {
            return `/add-update-person`
        }
    } else if (selectedCategory === 'Position') {
        if (id) {
            return `/add-update-position/${id}`
        } else {
            return `/add-update-position`
        }
    } else if (selectedCategory === 'User') {
        if (id) {
            return `/add-update-user/${id}`
        } else {
            return `/add-update-user`
        }
    }
}

