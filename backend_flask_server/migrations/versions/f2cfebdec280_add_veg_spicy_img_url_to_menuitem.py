"""Add veg, spicy, img_url to MenuItem

Revision ID: f2cfebdec280
Revises: 
Create Date: 2025-04-10 16:13:39.394867

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f2cfebdec280'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menu_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('veg', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('spicy', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('img_url', sa.String(length=200), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menu_item', schema=None) as batch_op:
        batch_op.drop_column('img_url')
        batch_op.drop_column('spicy')
        batch_op.drop_column('veg')

    # ### end Alembic commands ###
