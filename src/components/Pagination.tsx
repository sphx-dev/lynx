import styled from "styled-components";

export const Pagination = ({
  page,
  setPage,
  totalItems,
  pageSize = 20,
}: {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  pageSize?: number;
}) => {
  const totalPages = Math.ceil(Number(totalItems) / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  if (totalItems <= pageSize) return null;

  return (
    <PagesContainer>
      {pages.map((p, index) => (
        <PageButton
          key={p}
          onClick={() => setPage(p)}
          className={index === page ? "selected" : ""}
        >
          {p + 1}
        </PageButton>
      ))}
    </PagesContainer>
  );
};

const PagesContainer = styled.div`
  min-height: 30px;
  display: flex;
  justify-content: center;
  gap: 1px;
`;

const PageButton = styled.button`
  min-width: 30px;
  min-height: 30px;
  ${({ theme }) => theme.fonts.typography.textSm};
  color: ${({ theme }) => theme.colors.selectedTheme.text.primary};
  background-color: ${({ theme }) =>
    theme.colors.selectedTheme.button["secondary"].background.default};
  &:focus {
    border: ${({ theme }) =>
      `1px solid ${theme.colors.selectedTheme.button["secondary"].border.focused} !important`};
  }
  &:hover,
  &.selected {
    background: ${({ theme }) =>
      theme.colors.selectedTheme.button["secondary"].background.hovered};
  }
  &:active {
    background: ${({ theme }) =>
      theme.colors.selectedTheme.button["secondary"].background.pressed};
  }
  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
  }
  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;
