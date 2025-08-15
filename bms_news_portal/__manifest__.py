# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'Portal NEWS',
    'version': '1.2',
    'sequence': 10,
    'description': """
        Portal news
    """,
    'depends': ['website'],
    'data': [
        'views/header.xml',
        'views/footer.xml',
        'views/blog_post.xml',
        'views/snippet_templates.xml',
    ],

    'assets': {
        'web.assets_frontend': [
            'bms_news_portal/static/src/scss/**',
            'bms_news_portal/static/src/js/**',
        ],
    },

    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
