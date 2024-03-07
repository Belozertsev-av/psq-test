const variantData = {
    alleleName: 'M1V',
    hgvs: {
        g: 'g.1171200A>G',
        c: 'c.0A>G',
        p: 'p.0Ter',
    },
    alleleSequence: 'G',
    externalSourceEntries: [
        {
            id: 'c.1A>G',
            link: null,
            database: {
                name: 'CFTR-France',
                alias: 'F',
                version: '26.01.2018',
                category: 'LOCUS SPECIFIC',
            },
            significance: 'UNKNOWN',
        },
        {
            id: '53423',
            link: 'https://preview.ncbi.nlm.nih.gov/clinvar/variation/53423',
            database: {
                name: 'Clinvar',
                alias: 'C',
                version: '02.10.2017',
                category: 'COMMON',
            },
            significance: 'PATHOGENIC',
        },
        {
            id: '5',
            link: 'http://genet.sickkids.on.ca/MutationDetailPage.external?sp=5',
            database: {
                name: 'CFTR1',
                alias: 'C1',
                version: '14.02.2017',
                category: 'LOCUS SPECIFIC',
            },
            significance: 'UNKNOWN',
        },
        {
            id: 'rs397508328',
            link: null,
            database: {
                name: 'CFTR2',
                alias: 'C2',
                version: '14.02.2017',
                category: 'LOCUS SPECIFIC',
            },
            significance: 'UNKNOWN',
        },
        {
            id: 'CM930094',
            link: null,
            database: {
                name: 'HGMD',
                alias: null,
                version: 'auto',
                category: 'COMMON',
            },
            significance: 'UNKNOWN',
        },
    ],
    genotype: 'HETEROZYGOTE',
    leftAnchorContig: 'chr7',
    leftAnchorPosition: 117120148,
    referenceSequence: 'A',
    rightAnchorPosition: 117120150,
    significance: 'PATHOGENIC',
}