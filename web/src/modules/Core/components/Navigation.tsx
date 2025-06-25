import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { NAVIGATION_LINKS, type NavigationLink } from "#core/const";
import { classNames } from "#core/utilities/attribute";
import { TbMenu2 } from "react-icons/tb";

function NavMenuItem({ link }: { link: NavigationLink }) {
  const Icon = link.icon;

  return (
    <Link to={link.href}>
      <Flex align="center" gap={4}>
        <Text>{link.title}</Text>
        <Icon />
      </Flex>
    </Link>
  );
}

function NavMenu({ atRoot }: { atRoot?: boolean }) {
  return (
    <Group
      className={classNames("main-nav", atRoot ? "root-nav" : "nested-nav")}
      component="nav"
      visibleFrom={atRoot ? "xs" : undefined}
    >
      {NAVIGATION_LINKS.map((link) => (
        <NavMenuItem key={link.href} link={link} />
      ))}
    </Group>
  );
}

export function Navigation() {
  return (
    <>
      <Menu>
        <Menu.Target>
          <ActionIcon
            style={{ transform: "translateX(12px)" }}
            size="xl"
            color="dark"
            variant="subtle"
            hiddenFrom="xs"
          >
            <TbMenu2 fontSize={24} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <NavMenu />
        </Menu.Dropdown>
      </Menu>

      <NavMenu atRoot />
    </>
  );
}
