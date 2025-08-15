from odoo import api, fields, models


class Website(models.Model):
    _inherit = 'website'

    visit_count = fields.Integer(compute='_coumpute_visit_count')

    def _coumpute_visit_count(self):
        for rec in self:
            visitors = self.env['website.visitor'].sudo().search([('website_id', '=', rec.id)])
            rec.visit_count = sum(visitors.mapped('visit_count'))