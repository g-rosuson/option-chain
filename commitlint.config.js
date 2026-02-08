// eslint-disable-next-line import/no-commonjs
module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w*)\((\w*)\): (.*)$/,
            headerCorrespondence: ['type', 'scope', 'subject']
        }
    },
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'refactor',
                'chore',
                'test',
                'docs',
                'style'
            ]
        ],
        'scope-enum': [
            2,
            'always',
            [
                'general',
                'housekeeping',
                'home-page',
                'project',
                'blog'
            ]
        ],
        'scope-empty': [2, 'never']
    }
};
