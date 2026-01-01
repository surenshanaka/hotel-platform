from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '0003'
down_revision: Union[str, Sequence[str], None] = '0002'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'rate_adjustment_history',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('room_id', sa.Integer(), nullable=False),
        sa.Column('old_rate', sa.Float(), nullable=False),
        sa.Column('new_rate', sa.Float(), nullable=False),
        sa.Column('reason', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['room_id'], ['rooms.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_rate_adjustment_history_id'), 'rate_adjustment_history', ['id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_rate_adjustment_history_id'), table_name='rate_adjustment_history')
    op.drop_table('rate_adjustment_history')
