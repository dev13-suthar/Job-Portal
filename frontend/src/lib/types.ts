interface PastExperience {
    startDate: string;
    endDate: string;
    role: string;
    companyName: string;
}

interface Profile {
    pastExperience: PastExperience[];
    profileSummary: string;
    _id: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role?: string;
    password: string;
    applications?: string[];
    jobs?: string[];
    hasCreatedCompany?: boolean;
    isProfileCompleted?: boolean;
    company?: string | null;
    __v: number;
    profession?: string;
    profile?: Profile;
    updatedAt?: string;
}
