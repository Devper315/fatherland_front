from odoo import api, fields, models


class Blog(models.Model):
    _inherit = 'blog.blog'

    parent_id = fields.Many2one('blog.blog', 'Parent blog')
    child_ids = fields.One2many('blog.blog', 'parent_id', 'Sub blogs')
    parent_id_domain = fields.Char(compute='_compute_parent_child_domain')
    child_ids_domain = fields.Char(compute='_compute_parent_child_domain')

    @api.depends('parent_id', 'child_ids')
    def _compute_parent_child_domain(self):
        for rec in self:
            all_children = self.get_all_children()
            rec.parent_id_domain = str([('id', 'not in', all_children.ids)])
            all_ancestors = self.get_all_ancestors()
            rec.child_ids_domain = str([('parent_id', '=', False), ('id', 'not in', all_ancestors.ids)])

    def get_all_ancestors(self):
        if self.parent_id:
            return self + self.parent_id.get_all_ancestors()
        return self

    def get_all_children(self):
        children = self + self.child_ids
        for child in self.child_ids.filtered(lambda c: c != self.parent_id):
            children |= child.get_all_children()
        return children
